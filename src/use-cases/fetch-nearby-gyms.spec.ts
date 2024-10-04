import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { describe } from "node:test";
import { it, expect, beforeEach } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";



let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe("Fetch Nearby Gyms Use Case", () => {

    beforeEach(async () =>{
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(gymsRepository);

    })


  it("should be able to fetch nearby gyms", async () => {

    await gymsRepository.create({
        title: "Near Gym",
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
    })
    await gymsRepository.create({
        title: "Far Gym",
        description: null,
        phone: null,
        latitude: -22.8288288,
        longitude: -43.2822769,
    })

    const { gyms } = await sut.execute({
     userLatitude: -27.2092052,
     userLongitude: -49.6401091,
    });
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
        expect.objectContaining({ title: "Near Gym"}),
    ])
  });
      
})