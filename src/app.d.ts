import type { User } from '$ts/common/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
