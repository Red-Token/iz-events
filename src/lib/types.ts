export interface TypeEvents {
	owner: string;
	uuid: string;
	title: string;
	geoHashes: string[] | undefined;
	description: string;
	start: Date | string;
	places: string[] | undefined;
}
