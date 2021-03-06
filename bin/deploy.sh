DATABASE_DOCKER_ID=4d83
echo 'start';
docker start $DATABASE_DOCKER_ID &&
cd /home/blog/app/ &&
git pull &&
docker build --network=host -t howard/next-blog-app . &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 3000:3000 -d howard/next-blog-app &&
echo 'OK!'