import { plainToInstance, ClassConstructor } from 'class-transformer';

export function transformToDto<T>(dto: ClassConstructor<T>, entity: object): T {
  return plainToInstance(dto, entity, {
    excludeExtraneousValues: true,
    exposeUnsetFields: true,
  });
}
