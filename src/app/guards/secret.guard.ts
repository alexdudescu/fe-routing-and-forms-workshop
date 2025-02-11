import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { map } from "rxjs";
import { SecretService } from "~/services/secret.service";

export const secretGuard: CanActivateFn = () => {
  const secretService = inject(SecretService);
  const correctSecret = "super_secret";

  return secretService.getSecret().pipe(
    map((storedSecret) => storedSecret === correctSecret)
  )
}
