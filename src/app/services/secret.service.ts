import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class SecretService {
  private _baseUrl = '/api/user';
  private _httpClient = inject(HttpClient);

  public getSecret() {
    return this._httpClient.get<{secret: string}>(this._baseUrl).pipe(
      map(({secret}) => secret)
    );
  }
}
