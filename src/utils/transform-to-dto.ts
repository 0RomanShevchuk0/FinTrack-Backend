import { plainToInstance } from 'class-transformer';

export function transformToDto(entity: any, dto: any) {
  return plainToInstance(dto, entity, {
    excludeExtraneousValues: true,
  });
}
