import 'dotenv/config';
import * as Joi from 'joi';

export interface envConfig {
  PORT: number;
  STRIPE_SECRET: string;
  STRIPE_WEBHOOK_SECRET: string;
  // otros campos aquí...
}

// 2. Schema Joi
const envSchema = Joi.object({
  PORT: Joi.number().port().required(),
  STRIPE_SECRET: Joi.string().required(),
  STRIPE_WEBHOOK_SECRET: Joi.string().required(),
  // otros...
}).unknown(true);

// 3. Validación
const validated = envSchema.validate(process.env, {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});

if (validated.error) {
  throw new Error(`❌ Error(s) en variables de entorno:\n${validated.error.details.map((d) => `- ${d.message}`).join('\n')}`);
}

const value = validated.value as Record<string, unknown>;

export const envs: envConfig = {
  PORT: Number(value.PORT),
  STRIPE_SECRET: String(value.STRIPE_SECRET),
  STRIPE_WEBHOOK_SECRET: String(value.STRIPE_WEBHOOK_SECRET),
  // otros campos, asegurando el tipo
};
