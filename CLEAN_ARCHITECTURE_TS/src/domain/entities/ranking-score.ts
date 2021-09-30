/* eslint-disable @typescript-eslint/indent */
type Player = {
 name: string
 country: string
}

type Hero = {
 name: string
 level: number
}

export type RankingScore = {
 player: Player
 score: number
 matchDate: Date
 heroes: Hero[]
}
