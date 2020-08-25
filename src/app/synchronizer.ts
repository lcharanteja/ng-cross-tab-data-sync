import { InjectionToken, inject } from "@angular/core";
// https://github.com/ng-web-apis/common
import { PAGE_VISIBILITY, LOCAL_STORAGE } from "@ng-web-apis/common";
import { FormControl } from "@angular/forms";
import { switchMap, tap, filter, map } from "rxjs/operators";

const DATA_KEY = "data";

export const SYNCHRONIZER_FACTORY = new InjectionToken(
  "A stream that syncs control data between tabs",
  {
    factory: () => {
      const pageVisibility$ = inject(PAGE_VISIBILITY);
      const localStorage = inject(LOCAL_STORAGE);

      return (accessor: () => string) =>
        pageVisibility$.pipe(
          tap(visible => {
            if (!visible) {
              localStorage.setItem(DATA_KEY, accessor());
            }
          }),
          filter(visible => visible),
          map(() => localStorage.getItem(DATA_KEY))
        );
    }
  }
);
