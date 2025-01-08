export interface TypeEvents {
	owner: string;
	uuid: string;
	title: string;
	geoHashes: string[] | undefined;
	description: string;
	date: Date | string;
	places: string[] | undefined;
}
