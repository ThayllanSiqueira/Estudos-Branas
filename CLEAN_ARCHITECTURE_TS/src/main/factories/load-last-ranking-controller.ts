import { Controller } from '@/presentation/contracts'
import { LastRankingLoaderService } from '@/data/services/last-ranking-loader'
import { FakeRankingRepository } from '@/infra/repositories'
import { LoadLastRankingController } from '@/presentation/controllers'

export const makeLoadLastRankingController = (): Controller => {
  const repo = new FakeRankingRepository()
  const loader = new LastRankingLoaderService(repo)
  return new LoadLastRankingController(loader)
}
