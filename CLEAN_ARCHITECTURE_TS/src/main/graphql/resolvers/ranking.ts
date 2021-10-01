import { makeLoadLastRankingController } from '@/main/factories'
import { adaptResolver } from '../../adapters'

export default {
  Query: {
    lastRanking: async (): Promise<any> => adaptResolver(makeLoadLastRankingController())
  }
}
