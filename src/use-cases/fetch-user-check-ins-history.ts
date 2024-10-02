import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";


 
interface FetchUseCheckInsHistoryUseCaseRequest{
   userId: string
   page: number
}

interface FetchUseCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUseCheckInsHistoryUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ){}

    async execute({ 
        userId,
        page
    }: FetchUseCheckInsHistoryUseCaseRequest): Promise<FetchUseCheckInsHistoryUseCaseResponse>{
        const checkIns = await this.checkInsRepository.findManyByUserId(userId , page)

        return {
            checkIns,
        }
    }
}