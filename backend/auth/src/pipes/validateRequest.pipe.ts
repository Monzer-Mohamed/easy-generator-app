import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata, Logger } from '@nestjs/common';

@Injectable()
export class ValidateRequestPipe implements PipeTransform {
  private readonly logger = new Logger(ValidateRequestPipe.name);

  constructor(private readonly schemas: Object) { }

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (metadata.type !== 'body') return value;
      const schema = this.schemas[String(metadata.metatype?.name)];
      const { error, value: validatedValue } = schema.validate(value, {
        abortEarly: false,
        allowUnknown: false,
      });

      if (error) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: error.details.map((err: any) => err.message)
        });
      }
      return validatedValue;
    } catch (error) {
      this.logger.error(error);
    }
  }

}
