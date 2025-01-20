export interface TypeOfEvents {
	uuid: string | number | undefined
	title: string
	geoHashes?: string[]
	participants?: string[][]
	description: string
	start: Date | string
	end?: Date | string
	locations?: string[]
}
