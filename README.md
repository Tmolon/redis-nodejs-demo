# docker-redis-nodejs-demo

Bu çalışmada temel düzeyde Docker üzerinde Redis ve nodejs kullanarak basit bir pub/sub ve Cache modelinin oluştulmasını ele alacağız. Bilindiği üzere redis sistemlerimiz üzerindeki Cache mekanizması oluşturmada , Pub/Sub modeli oluşturmada ve sistemimize belirgin şekilde hız kazandırmada kullanılan bir modülümüz. Çalışmamızda sırasıyla aşağıdaki adımları izleyeceğiz

#adımlar
1-Docker üzerinde redisi ayaklandırma
2-nodejs kullanarak redis server a bağlantı sağlama
3-get ve set komutları ile redise veri gönderme ve çekme
4-pub sub kullanarak belirli kanallar yolu ile mesajlarımızı iletip çekme

#1- Docker üzerinde redisi ayaklandırma
Kendi laptop veya sunucularımıza dockerı yükledikten sonra yapmamız gereken tek şey aşağıdaki komutu, komut satırından çalıştırmak.
  
  docker run –name redisapp  -p 6379:6379 redis

komuttanda anlaşılacağı üzere içerden ve dışardan 6379 portunu redise bağlanmak için kullanacağız. Konsoldan redis containerına girmek için,
  
  docker exec -it <container id> bin/bash

komutunu kullanabiliriz. Containera girdikten sonra "redis-cli" komutu ile redisin command line toolunu kullanmaya hazırız. Redis key value şeklinde depoplama yaptığından, 
redise veri yazarken "SET <key> <value>" 
veri okurken "GET <key>" 
veriyi silerken "DEL <key>" 
hash olarak bir veri yazarken "hset <hash name> <key> <value>"  (örneğin bir kullanıcı objesi atmak istersek person hashi açıp içine çeşitli key value değerleri depolayabiliriz.)
hash olarak bir veri okurken "hget <hash name> <key>" 

#2-nodejs kullanarak redis server a bağlantı sağlama
nodejs proje dosyamızı açtıktan sonra terminalden 
  Npm install –save redis
komutu ile redis paketimizi projeye ekliyoruz ve app.js isminde dosya oluştururuyoruz. app.js içinde aşağıdaki satırlar bizim redise bağlanmamızı sağlayacaktır.
  
  const redis = require('redis')
  const client = redis.createClient()

  client.on("error", error => {
      console.log(error);
  });

bu noktada akıla takılan soru "Biz ne ip nede port yazdık bu nasıl bağlandı?" olacaktır. Default olarak redisi 6379 üzerinden localhosttan ayaklandırdığımız için nodejs de default ip ve porttan hızlıca bağlanacaktır.
  
#3-get ve set komutları ile redise veri gönderme ve çekme  

app.js e aşağıdaki fonskiyonları ekleyerek key value pairleri depolayıp çekebiliriz.

  //Key value ekleme
  client.set("name","Tolga", (err,msg)=>{
      if(err){
          console.log(err)
      }
      console.log(msg)
  })

  client.get("name", (err,msg)=>{
      if(err){
          console.log(err)
      }
      console.log(msg)
  })

#4-pub sub kullanarak belirli kanallar yolu ile mesajlarımızı iletip çekme

Bu aşamada bir publisher.js bir de consumer.js dosyası oluşturup, pub üzerinden bir mesaj atıp sub üzerinden yakalayacağız. Olan bitenleri ise console ekranının çıktısından izleyeceğiz. Göndermek için rast gele key value değerleri içeren bir json dosyası oluşturduk. publisher bu json dosyasından verileri alacak ve tek tek bir kanaldan mesaj olarak iletecek. consumer ise o kanalı dinleyerek gelen mesajları bize gösterecek. aynı kanalı dinleyen tüm consumerlar aynı mesajı alacaktır.
  
Tüm proje dosyları repo da ekli vaziyette bulunmaktadır. detayları inceleyip basit bir demo yaparken kullanabilirsiniz.
  
  
  

  
