import { createAction, props } from '@ngrx/store';

const RANDOM = 'random';

export const inc = createAction('incremeto');
export const dec = createAction('decremento');
export const random = createAction(RANDOM);
export const saltar = createAction('Saltar', props<{ num: number }>());
