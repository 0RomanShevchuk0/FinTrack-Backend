import { AuthGuard } from '@nestjs/passport';
import { UseGuards, applyDecorators } from '@nestjs/common';

export const Auth = () => applyDecorators(UseGuards(AuthGuard('jwt')));
