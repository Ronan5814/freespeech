import type { Load } from '@sveltejs/kit';
import trpc from '$lib/client/trpc';

export const load: Load = async ({ params }) => {
	// 1) Get slug
	const { slug } = params;

	// 2) Get the project from trpc
	const project = await trpc().query('project:fetch', slug + '');
	if (!project) return { error: 404 };

	// 3) Sort the tiles by their tile_index property
	project.pages.forEach((page, index) => {
		project.pages[index].tiles = page.tiles.sort((a, b) => a.tile_index - b.tile_index);
	});

	// 4) Return the project
	return project;
};
