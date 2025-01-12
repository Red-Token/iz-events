export interface TypeOfEvents {
	uuid: string
	title: string
	geoHashes: string[] | undefined
	participants: string[][] | undefined
	description: string
	start: Date | string
	locations: string[] | undefined
}
