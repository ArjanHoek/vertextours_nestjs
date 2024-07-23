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
      return;
    }

    return this.identifiers[entityName][index] as unknown as T;
  }
}
