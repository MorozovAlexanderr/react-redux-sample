import { response, context } from 'msw';

export function res(...transformers: any[]) {
  return response(...transformers, context.delay());
}
