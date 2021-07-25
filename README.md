#[项目展示链接](http://101.201.70.240:3000/)

# 代码使用

请下载本代码，然后用 WebStorm 或者 VSCode 打开。

## 启动数据库服务器

复制ormconfig_sample.json为ormconfig.json

**如果你希望将应用部署在另一个docker里**
- 在所有docker命令中加入```--network=host```选项
- 或者，在Mac下可以更改ormconfig.json配置为```"host":host.docker.internal```，则数据库docker无需额外配置


如果你没有创建过数据库，请运行
```bash
mkdir blog-data
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

或者旧版 Windows Docker 客户端运行下面的代码

docker run -v "blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

如果你创建过数据库，请运行

```bash
docker ps -a
docker restart 容器id
```

## 创建数据库

```
docker exec -it <id> bash
psql -U blog
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 生成数据表

首先修改 ormconfig.json 中的 host，然后运行

```
yarn compile
yarn m:run
```

## 生成测试数据
```
node dist/seed.js
```

## 开发
在根目录新建.env.local文件，生成自己的Cookie Password（至少32位）
```
SECRET_COOKIE_PASSWORD=至少32位密码
```
进行开发
```bash
yarn dev
# or
npm run dev
```

## 自动化部署
服务器安装无需Node和yarn，安装docker即可
```bash
ssh blog@aliyun 'sh /home/blog/app/bin/deploy.sh'
```

具体步骤如下：
```bash 
DATABASE_DOCKER_ID=<容器id>
docker start $DATABASE_DOCKER_ID &&
cd /home/blog/app/ &&
git pull &&
docker build -t howard/next-blog-app . &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 3000:3000 -d howard/next-blog-app &&
```

