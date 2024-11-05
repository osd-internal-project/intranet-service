import { Injectable } from '@nestjs/common';
import {
  emailTemplateRepository,
  emailTemplateTypeRepository,
} from '@inventory/share';

@Injectable()
export class EmailTemplateTypeService {
  constructor(
    private readonly emailtemplatetypesRepo: emailTemplateTypeRepository,
    private readonly emailtemplateRepo: emailTemplateRepository,
  ) {}

  findAll() {
    return this.emailtemplatetypesRepo.findMany({
      include: {
        emailTemplateFields: true,
      },
    });
  }
  async update(body) {
    const data = await Promise.all(
      body.map(async (record: { templateUsedId: string; typeId: number }) => {
        const resultFindTemplate = await this.emailtemplateRepo.findOne({
          where: {
            templateId: record.templateUsedId,
            used: true,
          },
        });
        if (resultFindTemplate !== null) {
          await this.emailtemplateRepo
            .update({
              where: {
                templateId: resultFindTemplate.templateId,
              },
              data: {
                used: false,
              },
            })
            .then(async () => {
              await this.emailtemplateRepo.update({
                where: {
                  templateId: record.templateUsedId,
                },
                data: {
                  used: true,
                },
              });
            });
        } else {
          await this.emailtemplateRepo.update({
            where: {
              templateId: record.templateUsedId,
            },
            data: {
              used: true,
            },
          });
        }

        const updateTypeTemplate = await this.emailtemplatetypesRepo.update({
          where: { id: record.typeId },
          data: {
            templateUsedId: record.templateUsedId,
          },
        });
        return updateTypeTemplate;
      }),
    );

    return data.length > 0
      ? { status: 'success', data: data }
      : { status: 'error', data: [] };
  }
}
