import { Injectable } from '@nestjs/common';
import {
  isValidationOptions,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../service/user.service';

@Injectable()
@ValidatorConstraint()
export class UniqueCpfValidator implements ValidatorConstraintInterface {
  constructor(private usuarioService: UserService) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const user = await this.usuarioService.findByCpf(value);
    return !!!user;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'user.already.exits.with.cpf';
  }
}

export function IsCpfUnique(options?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: UniqueCpfValidator,
    });
  };
}
