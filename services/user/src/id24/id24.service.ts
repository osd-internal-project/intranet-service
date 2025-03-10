import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import config from '../configs';
import { UserType } from 'src/id24users/type';
const { id24Url, id24LoginUrl, Authorization } = config();

export type IdCheckingData = {
  username?: string;
  email?: string;
  type: UserType;
};
@Injectable()
export class Id24Service {
  private Agent = new https.Agent({
    rejectUnauthorized: false,
  });

  async createUser(createUserDto: any) {
    const data = {
      username: createUserDto.username,
      email: createUserDto.email,
      groups: createUserDto.group,
      loginUrl: `${id24LoginUrl}`,
      is_active: createUserDto.active,
      type: createUserDto.type,
    };
    const config = {
      method: 'post',
      url: `${id24Url}/backend/api/v1/users`,
      httpsAgent: this.Agent,
      headers: {
        Authorization: Authorization,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    return axios(config);
  }

  async createUserLdap(createUserDto: any) {
    const data = {
      username: createUserDto.username,
      email: createUserDto.email,
      groups: createUserDto.group,
      loginUrl: `${id24LoginUrl}`,
      ldapQuery: createUserDto.ldapQuery,
      phoneNumber: createUserDto.phone,
      type: UserType.LDAP,
    };
    const config = {
      method: 'post',
      url: `${id24Url}/backend/api/v1/users`,
      httpsAgent: this.Agent,
      headers: {
        Authorization: Authorization,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    return axios(config);
  }

  async validatePassword(password: string) {
    const data = { password: password };
    const config = {
      method: 'post',
      url: `${id24Url}/backend/api/v1/users/validata_password`,
      httpsAgent: this.Agent,
      headers: {
        Authorization: Authorization,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    return axios(config)
      .then(() => [])
      .catch((error) => {
        if (error.response.status === 400) {
          return error.response.data.reasons;
        }
        return ['Something wrong'];
      });
  }

  async validateCheck(body: IdCheckingData) {
    const { username, email } = body;
    let data: IdCheckingData;
    if (username) {
      data = {
        username: body.username,
        type: body.type,
      };
    }
    if (email) {
      data = {
        email: body.email,
        type: body.type,
      };
    }
    const config = {
      method: 'post',
      url: `${id24Url}/backend/api/v1/users/check-id`,
      httpsAgent: this.Agent,
      headers: {
        Authorization: Authorization,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    return await axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async updateEmail(userId: string, email: string) {
    const config = {
      method: 'put',
      url: `${id24Url}/backend/api/v1/users/${userId}/email`,
      httpsAgent: this.Agent,
      headers: {
        Authorization: Authorization,
        'Content-Type': 'application/json',
      },
      data: {
        email: email,
      },
    };
    return axios(config);
  }

  async updateLdapQuery(userId: string, ldapQuery: string) {
    const config = {
      method: 'put',
      url: `${id24Url}/backend/api/v1/users/${userId}/ldapQuery`,
      httpsAgent: this.Agent,
      headers: {
        Authorization: Authorization,
        'Content-Type': 'application/json',
      },
      data: {
        ldapQuery: ldapQuery,
      },
    };
    return axios(config);
  }

  async updateActive(userId: string, active: boolean) {
    const config = {
      method: 'put',
      url: `${id24Url}/backend/api/v1/users/${userId}/active`,
      httpsAgent: this.Agent,
      headers: {
        Authorization: Authorization,
        'Content-Type': 'application/json',
      },
      data: {
        active: active,
      },
    };
    return axios(config);
  }

  async updateGroup(userId: string, groups: string[]) {
    const config = {
      method: 'put',
      url: `${id24Url}/backend/api/v1/users/${userId}/groups`,
      httpsAgent: this.Agent,
      headers: {
        Authorization: Authorization,
        'Content-Type': 'application/json',
      },
      data: groups,
    };
    return axios(config);
  }

  async resetPassword(userId: string, password: string) {
    const data = {
      password: password,
    };
    const config = {
      method: 'put',
      url: `${id24Url}/backend/api/v1/users/${userId}/password`,
      httpsAgent: this.Agent,
      headers: {
        Authorization: Authorization,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    return axios(config)
      .then((res) => {
        res;
      })
      .catch((error) => {
        console.log(`error`, error);
        if (error.response.status === 400) {
          return error.response.data.reasons;
        }
        return ['Something wrong'];
      });
  }
  async getId24UsersAll(token: string) {
    const config = {
      method: 'get',
      url: `${id24Url}/backend/api/v1/users`,
      httpsAgent: this.Agent,
      headers: {
        Authorization: Authorization,
        'Content-Type': 'application/json',
      },
    };
    return axios(config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        return 500;
      });
  }
  async getUsers(username: string) {
    const config = {
      method: 'get',
      url: `${id24Url}/backend/api/v1/users/users?username=${username}`,
      httpsAgent: this.Agent,
      headers: {
        Authorization: Authorization,
        'Content-Type': 'application/json',
      },
    };
    return axios(config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return 500;
      });
  }

  async getUserByUserId(userId: string, type: string) {
    const config = {
      method: 'get',
      url: `${id24Url}/backend/api/v1/users/${userId}/username/${type}`,
      httpsAgent: this.Agent,
      headers: {
        Authorization: Authorization,
        'Content-Type': 'application/json',
      },
    };
    return axios(config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return 500;
      });
  }

  async getGroups(groupId: string) {
    const config = {
      method: 'get',
      url: `${id24Url}/backend/api/v1/groups/${groupId}`,
      httpsAgent: this.Agent,
      headers: {
        Authorization: Authorization,
        'Content-Type': 'application/json',
      },
    };
    return axios(config)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        return { error };
      });
  }
}
