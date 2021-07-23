DATABASE_DOCKER_ID=123456
echo 'start';
docker start $DATABASE_DOCKER_ID &&
cd /home/blog/app/ &&
git pull &&
yarn install --production=false &&
yarn build &&
yarn compile &&
yarn m:run &&
docker build -t howard/next-blog-app . &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 3000:3000 -d howard/next-blog-app &&
echo 'OK!'