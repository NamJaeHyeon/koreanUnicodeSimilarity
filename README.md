# koreanUnicodeSimilarity
한글 유니코드 유사도 측정기 (검색어 자동추천용)
### 기능

- 1글자 유사도
- 여러글자 유사도

```
let v1 = KoreanUnicode.similarity(letter1, letter2);
let v2 = KoreanUnicode.stringSimilarity(str1,str2)
```
예시
```
let A = '궯뛙가가각갔대동해물과ㅇㄴㅎㅅㅇ';
let B = '궵뛙가강갑갓데마르고닳안녕하세요';
for(let i = 0; i<A.length; i++){
    let r = KoreanUnicode.similarity(A[i],B[i]);
    console.log(A[i],B[i],r);    
}

궯 궵 0.12123890224980606
뛙 뛙 1
가 가 1
가 강 0.68607
각 갑 0.0931095
갔 갓 0.9801
대 데 0.423225
동 마 0.02583844580777096
해 르 0.03241738505747126
물 고 0.03253743027693511
과 닳 0.07979999999999998
ㅇ 안 0.9
ㄴ 녕 0.9
ㅎ 하 0.9
ㅅ 세 0.9
ㅇ 요 0.9
```

```
let r = KoreanUnicode.stringSimilarity("ㅊㅇㅇ","천안역");
console.log(r) // 1.2100000000000002
```
