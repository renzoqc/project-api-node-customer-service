// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './planta.controller';
// import { UsersService } from '../services/planta.service';
//
// describe('PlantaController', () => {
//   let plantaController: UsersController;
//   let plantaService: UsersService;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [UsersService],
//     }).compile();
//
//     plantaController = module.get<UsersController>(UsersController);
//     plantaService = module.get<UsersService>(UsersService);
//   });
//
//   describe('findAll', () => {
//     it('Should return a array of planta', async () => {
//       const result = ['test'];
//       jest.spyOn(plantaService, 'findAll').mockImplementation(() => result);
//
//       expect(await plantaController.getPlantas()).toBe(result);
//     });
//   });
//
//   it('should be defined', () => {
//     expect(plantaController).toBeDefined();
//   });
// });
