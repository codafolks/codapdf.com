# Running the project Locally
## Install databases 
### DragonflyDB 
```bash
docker run --ulimit memlock=-1 --name dragonfly -d -p 0.0.0.0:6379:6379 --restart=always docker.dragonflydb.io/dragonflydb/dragonfly
``` 
