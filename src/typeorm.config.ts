import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthTokenEntity } from 'src/modules/auth/entities/auth.entity';
import { ForgotPasswordTokenEntity } from 'src/modules/auth/entities/forgot_password_token.entity';
import { MediaEntity } from 'src/modules/media/entities/media.entity';
import { User } from './modules/users/entities/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Project } from 'src/modules/projects/entities/project.entity';
import { Tier } from 'src/modules/tiers/entities/tier.entity';
import { TierRequest } from 'src/modules/projects/entities/tier_request.entity';
import { AccessLog } from 'src/modules/access-log/entities/access-log.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNC === 'true',
  entities: [User, MediaEntity, AuthTokenEntity, ForgotPasswordTokenEntity, Project, Tier, TierRequest, AccessLog],
  logging: process.env.DATABASE_LOGGING === 'true',
  connectTimeoutMS: 10000,
  maxQueryExecutionTime: 5000,
  logNotifications: true,
  namingStrategy: new SnakeNamingStrategy(),
};
