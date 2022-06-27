import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { typeORMConfig } from './typeorm.config';
import { gqlOptions } from './graphql/gql-options';
import { AuthModule } from './modules/auth/auth.module';
import { APP_SECRET } from './modules/auth/auth.constants';
import { UsersModule } from './modules/users/users.module';
import { CommonModule } from './modules/common/common.module';
import { MediaModule } from './modules/media/media.module';
import { SendGridTransport } from './transport/nodemailer-sendgrid';
import { TemplateModule } from 'src/modules/template/template.module';
import { ProjectModule } from 'src/modules/projects/project.module';
import { AccessLogModule } from 'src/modules/access-log/access-log.module';
import { CronJobModule } from 'src/modules/cronjobs/cron.module';
import { DashboardModule } from 'src/modules/dashboard/dashboard.module';
import { TierModule } from 'src/modules/tiers/tier.module';
import { KongModule } from 'src/modules/kong/kong.module';
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    GraphQLModule.forRoot(gqlOptions),
    MailerModule.forRoot({
      transport: 'smtps://quanndh1810@gmail.com:gszzgqholwpusltt@smtp.gmail.com',
      defaults: {
        from: process.env.EMAIL_SERVER_SENDER_FROM,
      },
      preview: false,
      template: {
        dir: `${process.cwd()}/src/templates/`,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MediaModule.register({
      driver: 'local',
      uploadDir: 'uploads',
      quality: 70,
      thumbSize: 200,
    }),
    AuthModule.register({
      secret: APP_SECRET,
    }),
    UsersModule.register({
      codeExpireTime: 30,
      TWO_FACTOR_AUTHENTICATION_APP_NAME: 'App',
    }),
    CommonModule,
    TemplateModule.forRoot({
      dir: __dirname + '/templates',
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_BULL_HOST,
        port: parseInt(process.env.REDIS_BULL_PORT || '6379', 10),
        password: process.env.REDIS_BULL_PASSWORD,
        keyPrefix: 'fullnode-job',
      },
      defaultJobOptions: {
        removeOnComplete: 1000,
        removeOnFail: 1000,
      },
      settings: {
        retryProcessDelay: 10000,
      },
    }),
    ProjectModule,
    AccessLogModule,
    CronJobModule,
    DashboardModule,
    TierModule,
    KongModule,
    SharedModule,
  ],
})
export class AppModule {}
