import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function ShouldBeValidTimeslot(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'shouldBeValidTimeslot',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(startsAt: any, args: ValidationArguments) {
          // Get the eventId from request params
          const eventId = args.object['eventId'];
          console.log(eventId, args.object);

          return false;
        },
      },
    });
  };
}
