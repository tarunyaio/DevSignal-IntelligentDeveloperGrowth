import { FastifyInstance } from 'fastify';
import { supabaseAdmin } from '../server';

export async function profileRoutes(fastify: FastifyInstance) {
  
  fastify.get('/profile/summary', async (request) => {
    const { data: repos, error } = await supabaseAdmin
      .from('repositories')
      .select('stars, forks, language, updated_at, name')
      .eq('owner_id', request.userId);

    if (error || !repos) {
      return { stats: null, persona: null };
    }

    const totalStars = repos.reduce((acc, r) => acc + (r.stars || 0), 0);
    const totalForks = repos.reduce((acc, r) => acc + (r.forks || 0), 0);
    const totalProjects = repos.length;

    // Aggregate languages
    const languages: Record<string, number> = {};
    repos.forEach(r => {
      if (r.language) {
        languages[r.language] = (languages[r.language] || 0) + 1;
      }
    });

    // Calculate Persona
    let persona = "The Code Voyager";
    const topLang = Object.entries(languages).sort((a, b) => b[1] - a[1])[0]?.[0];
    
    if (totalStars > 50) persona = "The Star Magnet";
    else if (totalForks > 25) persona = "The Architect of Collaboration";
    else if (topLang === 'TypeScript' || topLang === 'JavaScript') persona = "The Frontend Alchemist";
    else if (topLang === 'Rust' || topLang === 'C++') persona = "The Performance Sage";
    else if (totalProjects > 10) persona = "The Prolific Builder";

    // Simple Rhythm Analysis (Mocked for now, in a real app would use commit times)
    const rhythm = {
      type: "Night Owl",
      description: "Your signal peaks in the quiet hours of the night."
    };

    return {
      stats: {
        totalStars,
        totalForks,
        totalProjects,
        languages
      },
      persona: {
        title: persona,
        level: Math.floor(totalProjects / 2) + 1
      },
      rhythm
    };
  });
}
