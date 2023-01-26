class KoreanUnicode{
    static Keybord = {"ㅂ":[0,0],"ㅈ":[0,1],"ㄷ":[0,2],"ㄱ":[0,3],"ㅅ":[0,4],"ㅛ":[0,5],"ㅕ":[0,6],"ㅑ":[0,7],"ㅐ":[0,8],"ㅔ":[0,9],"ㅁ":[1,0.3],"ㄴ":[1,1.3],"ㅇ":[1,2.3],"ㄹ":[1,3.3],"ㅎ":[1,4.3],"ㅗ":[1,5.3],"ㅓ":[1,6.3],"ㅏ":[1,7.3],"ㅣ":[1,8.3],"ㅋ":[2,0.6],"ㅌ":[2,1.6],"ㅊ":[2,2.6],"ㅍ":[2,3.6],"ㅠ":[2,4.6],"ㅜ":[2,5.6],"ㅡ":[2,6.6]};
    static first = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"
    static middle = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
    static last = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
    static lowerCase = {"ㄲ":["ㄱ","ㄱ"],"ㄳ":["ㄱ","ㅅ"],"ㄵ":["ㄴ","ㅈ"],"ㄶ":["ㄴ","ㅎ"],"ㄸ":["ㄷ","ㄷ"],"ㄺ":["ㄹ","ㄱ"],"ㄻ":["ㄹ","ㅁ"],"ㄼ":["ㄹ","ㅂ"],"ㄽ":["ㄹ","ㅅ"],"ㄾ":["ㄹ","ㅌ"],"ㄿ":["ㄹ","ㅍ"],"ㅀ":["ㄹ","ㅎ"],"ㅃ":["ㅂ","ㅂ"],"ㅄ":["ㅂ","ㅅ"],"ㅆ":["ㅅ","ㅅ"],"ㅉ":["ㅈ","ㅈ"],"ㅒ":["ㅐ","ㅣ"],"ㅖ":["ㅔ","ㅣ"],"ㅘ":["ㅗ","ㅏ"],"ㅙ":["ㅗ","ㅐ"],"ㅚ":["ㅗ","ㅣ"],"ㅝ":["ㅜ","ㅝ"],"ㅞ":["ㅜ","ㅔ"],"ㅟ":["ㅜ","ㅣ"],"ㅢ":["ㅡ","ㅣ"]};
    static similarity(char1,char2){
        if(char1===char2) return 1;
        if(!typeof(char1)==='string' || !char1.length===1) return 'not one letter';
        let c1 = this.getClass_(char1);
        let c2 = this.getClass_(char2);
        if(c1==1 && c2==1){
            let d1 = KoreanUnicode.decompose_(char1);
            let d2 = KoreanUnicode.decompose_(char2);
            let s = 1;
            if(d1[0]==d2[0]) s *= 0.99;
            else s *= KoreanUnicode.nearScore_(this.first[d1[0]],this.first[d2[0]]);
            if(d1[1]==d2[1]) s *= 0.99;
            else s *= KoreanUnicode.nearScore_(this.middle[d1[1]],this.middle[d2[1]]);
            if(d1[2]+d2[2]==0) s *= s>0.4?0.9:0.5;
            else if (d1[2]==0 || d2[2]==0) s *= 0.7;
            else s *= KoreanUnicode.nearScore_(this.last[d1[2]-1],this.last[d2[2]-1]);
            return s;
        }else if(c1!==0 && c2!==0){
            let d1 = c1==1 ? KoreanUnicode.decompose_(char1):char1;
            let d2 = c2==1 ? KoreanUnicode.decompose_(char2):char2;
            let ki = KoreanUnicode.first;
            if(((c1==1)?ki[d1[0]]:d1)==((c2==1)?ki[d2[0]]:d2)) return 0.9;
            else return 0.1;
        }else{
            return 0;
        }
    }
    static nearScore_(base1,base2){
        let handicap = false;
        if(base1 in this.lowerCase)base1 = this.lowerCase[base1];
        else base1 = [base1];
        if(base2 in this.lowerCase)base2 = this.lowerCase[base2];
        else base2 = [base2];
        if(base1.some(x=>base2.includes(x))){
            handicap = true;
        }
        base1 = base1[0];
        base2 = base2[0];
        let k = KoreanUnicode.Keybord;
        let p1 = k[base1];
        let p2 = k[base2];
        let r = 0.95/(1+(p1[0]-p2[0])**2+(p1[1]-p2[1])**2);
        return r + (handicap ? 0.05:0)
    }
    static getClass_(char){
        if(char>='가'&&char<='힣')return 1;
        if(char>='ㄱ'&&char<='ㅣ')return 2;
        return 0;
    }
    static decompose_(char){
        let c = char.charCodeAt()-0xAC00;
        let f = c%28;
        let n = (c/28|0)%21;
        let i = c/588|0;
        return [i,n,f];
    }
    static stringSimilarity(str1,str2){
        let p_ = -1;
        let s = 1;
        let o = 1;
        for(let i = 0; i<str1.length; i++){
            let p = 0;
            let max = 0;
            for(let j = 0; j < str2.length; j++){
                let s_ = this.similarity(str1[i],str2[j]);
                if(s_ > max){
                    max = s_;
                    p = j;
                }
            }
            if (p_+1 == p && max > 0.9){
                o *= 1.4;
            } else if (p_+1 == p && max > 0.4){
                o *= 1.1;
            } else {
                o *= 0.9
            }
            
            s *= max+0.1;
            p_=p;
        }
        return s*o;
    }
}

// let r = KoreanUnicode.stringSimilarity("ㅊㅇ","천안역");
// console.log(r);
