import { Injectable } from '@nestjs/common';

@Injectable()
export class IdentifierService {
  private identifiers: { [entityName: string]: string[] } = {};

  constructor() {}

  public saveIdentifier(entityName: string, identifier: string) {
    if (!this.identifiers[entityName]) {
      this.identifiers[entityName] = [];
    }

    this.identifiers[entityName].push(identifier);
  }

  public getIdentifierAtIndex<T>(entityName: string, index: number) {
    if (!this.identifiers[entityName]) {
      throw new Error(`No identifiers stored for entity '${entityName}'`);
    }

    const identifier = this.identifiers[entityName][index] as unknown as T;

    if (!identifier) {
      throw new Error(
        `No identifier stored at index '${index}' for entity '${entityName}'`,
      );
    }

    return identifier;
  }
}
