if (window.location.href == 'file:///d%3A/Users/SETUP%20GAME/Documents/Chess/playing_page.html'){
    let pw1,pw2,pw3,pw4,pw5,pw6,pw7,pw8;
    let list = [pw1,pw2,pw3,pw4,pw5,pw6,pw7,pw8];
    for(i=0;i<8;i++){
        list[i] = document.getElementById(`pw${i+1}`)
        list[i].style.left = `${i*100}px`
        list[i].style.top = '600px'
    }
    [pw1,pw2,pw3,pw4,pw5,pw6,pw7,pw8] = list;
    let rw1,rw2,kw1,kw2,bw1,bw2,qw1,qw2;
    let list2 = [[rw1,rw2,kw1,kw2,bw1,bw2,qw1,qw2], ['r','k','b','q']]
    for(i=0;i<4;i++){
        for(j=0;j<2;j++){
            list2[0][i*2+j] = document.getElementById(`${list2[1][i]}w${j+1}`)
            list2[0][i*2+j].style.left = `${j*(700)-((j*2)-1)*100*i}px`
            list2[0][i*2+j].style.top = '700px'
        }
    }
    [rw1,rw2,kw1,kw2,bw1,bw2,qw1,qw2] = list2[0]
    let pb1,pb2,pb3,pb4,pb5,pb6,pb7,pb8;
    let list3 = [pb1,pb2,pb3,pb4,pb5,pb6,pb7,pb8];
    for(i=0;i<8;i++){
        list3[i] = document.getElementById(`pb${i+1}`)
        list3[i].style.left = `${i*100}px`
        list3[i].style.top = '100px'
    }
    [pb1,pb2,pb3,pb4,pb5,pb6,pb7,pb8] = list3;
    let rb1,rb2,kb1,kb2,bb1,bb2,qb1,qb2;
    let list4 = [[rb1,rb2,kb1,kb2,bb1,bb2,qb1,qb2], ['r','k','b','q']]
    for(i=0;i<4;i++){
        for(j=0;j<2;j++){
            list4[0][i*2+j] = document.getElementById(`${list4[1][i]}b${j+1}`)
            list4[0][i*2+j].style.left = `${j*(700)-((j*2)-1)*100*i}px`
            list4[0][i*2+j].style.top = '0px'
        }
    }
    [rb1,rb2,kb1,kb2,bb1,bb2,qb1,qb2] = list4[0]
    let biglist = [[], []];
    let biggerlist = Array.from(document.getElementsByTagName('img'))
    for(i=0;i<biggerlist.length;i++){
        biglist[0].push(parseInt(biggerlist[i].style.left,10))
        biglist[1].push(parseInt(biggerlist[i].style.top,10))
    }
    let cutoff = 16;
    moves_pot = function(piece){
        if (String(piece.id)[0] == 'p'){
            if (String(piece.id)[1] == 'w'){
                if (piece.style.top == '600px'){
                    return [[parseInt(piece.style.left, 10),parseInt(piece.style.top, 10)],[[0,-1]], 300]
                }
                else{
                    return [[parseInt(piece.style.left, 10),parseInt(piece.style.top, 10)],[[0,-1]], 200]
                }
            }
            if (String(piece.id)[1] == 'b')
                if (piece.style.top == '100px'){
                    return [[parseInt(piece.style.left, 10),parseInt(piece.style.top, 10)],[[0,1]], 300]
                }
                else{
                    return [[parseInt(piece.style.left, 10),parseInt(piece.style.top, 10)],[[0,1]], 200]
                }
        }
        if (String(piece.id)[0] == 'r'){
            return [[parseInt(piece.style.left, 10),parseInt(piece.style.top, 10)],[[0,-1],[1,0],[0,1],[-1,0]], null]
        }
        if (String(piece.id)[0] == 'b'){
            return [[parseInt(piece.style.left, 10),parseInt(piece.style.top, 10)],[[1,-1],[1,1],[-1,1],[-1,-1]], null]
        }
        if (String(piece.id)[0] == 'q'){
            if (String(piece.id)[2] == '1'){
                return [[parseInt(piece.style.left, 10),parseInt(piece.style.top, 10)],[[0,-1],[1,0],[0,1],[-1,0],[1,-1],[1,1],[-1,1],[-1,-1]], null]
            }
            else{
                return [[parseInt(piece.style.left, 10),parseInt(piece.style.top, 10)],[[0,-1],[1,0],[0,1],[-1,0],[1,-1],[1,1],[-1,1],[-1,-1]], 200]
            }
        }
    }
    blocking = function(pos, biglist){
        xq = xq = biglist[0].indexOf(pos[0])
        if(biglist[0].includes(pos[0]) && biglist[1].includes(pos[1])){
            for(qu=0;qu<biglist[0].filter(qx => qx === pos[0]).length;qu++){
                if(biglist[1][xq] == pos[1]){
                    return true
                }
                xq = biglist[0].indexOf(pos[0],xq+1)
            }
        }
        return false
    }
    moves_act = function(piece, biglist){
        j = moves_pot(piece)
        x = 100
        l = []
        if(String(piece.id)[0] != 'k'){
            for(i=0;i<j[1].length;i++){
                while((j[0][0]+x*j[1][i][0] != 800 && j[0][0]+x*j[1][i][0] != -100 && j[0][1]+x*j[1][i][1] != 800 && j[0][1]+x*j[1][i][1] != -100) &&  blocking([j[0][0]+x*j[1][i][0], j[0][1]+x*j[1][i][1]],biglist) == false && (x != j[2])){
                    l.push([j[0][0]+x*j[1][i][0],j[0][1]+x*j[1][i][1]])
                    x += 100
                }
                if(((blocking([j[0][0]+x*j[1][i][0], j[0][1]+x*j[1][i][1]],[biglist[0].slice(cutoff), biglist[1].slice(cutoff)]) && piece.id[1] == 'w') || (blocking([j[0][0]+x*j[1][i][0], j[0][1]+x*j[1][i][1]],[biglist[0].slice(0,cutoff), biglist[1].slice(0, cutoff)]) && piece.id[1] == 'b')) && (x != j[2]) && piece.id[0] != 'p'){
                    l.push([j[0][0]+x*j[1][i][0],j[0][1]+x*j[1][i][1]])
                }
                else if(piece.id[0] == 'p'){
                    for(i=0;i<2;i++){
                        if((blocking([j[0][0]+100*(i*2-1), j[0][1]-100],[biglist[0].slice(cutoff), biglist[1].slice(cutoff)]) && piece.id[1] == 'w') || (blocking([j[0][0]+100*(i*2-1), j[0][1]+100],[biglist[0].slice(0,cutoff), biglist[1].slice(0,cutoff)]) && piece.id[1] == 'b')){
                            l.push([j[0][0]+100*(i*2-1), j[0][1]+(100*(Math.floor(biggerlist.indexOf(piece)/16)*2-1))])
                        }
                    }
                }
                x = 100
            }
        }
        else{
            j = [parseInt(piece.style.left, 10), parseInt(piece.style.top, 10), [-1,-1,1,1,-1]]
            for(i=0;i<2;i++){
                for(k=0;k<4;k++){
                    if(blocking([j[0]+100*j[2][k]*(1+i), j[1]+100*j[2][k+1]*(2-i)], biglist) == false && (j[0]+100*j[2][k]*(1+i) < 800 && j[0]+100*j[2][k]*(1+i) > -100) && (j[1]+100*j[2][k+1]*(2-i) < 800 && j[1]+100*j[2][k+1]*(2-i) > -100) || (blocking([j[0]+100*j[2][k]*(1+i), j[1]+100*j[2][k+1]*(2-i)], [biglist[0].slice(cutoff), biglist[1].slice(cutoff)]) && piece.id[1] == 'w') || (blocking([j[0]+100*j[2][k]*(1+i), j[1]+100*j[2][k+1]*(2-i)], [biglist[0].slice(0,cutoff), biglist[1].slice(0,cutoff)]) && piece.id[1] == 'b')){
                        l.push([j[0]+100*j[2][k]*(1+i),j[1]+100*j[2][k+1]*(2-i)])
                    }
                }
            }
        }
        return l
    }
    let x = [];
    let overlap = false;
    let turn = true;
    document.addEventListener('click', (e) => {
        // showing movement 
        mouseX = e.clientX - document.getElementById('board').getBoundingClientRect().left
        mouseY = e.clientY - document.getElementById('board').getBoundingClientRect().top
        overlap = false
        for(i=0;i<x.length;i++){
            if(x[i][0] == Math.floor(mouseX/100)*100 && x[i][1] == Math.floor(mouseY/100)*100 && blocking(x[i],biglist) && (biglist[0][mover] == x[i][0] && biglist[1][mover] == x[i][1]) == false){
                overlap = true
            }
        }
        for(j=0;j<biggerlist.length;j++){
            if(mouseX-100 <= parseInt(biggerlist[j].style.left, 10) && mouseX >= parseInt(biggerlist[j].style.left, 10) && mouseY-100 <= parseInt(biggerlist[j].style.top, 10) && mouseY >= parseInt(biggerlist[j].style.top, 10) && overlap == false && ((biggerlist[j].id[1] == 'w' && turn)||(biggerlist[j].id[1] == 'b' && turn == false))){
                document.querySelectorAll('[id = "moves"]').forEach(p => p.remove());
                mover = j
                x = moves_act(biggerlist[j],biglist)
                for(i=0;i<x.length;i++){
                    const square = document.createElement('div');
                    square.id = `moves`
                    square.style.background = `green`;
                    square.style.position = 'absolute';
                    square.style.width = '100px';
                    square.style.height = '100px';
                    square.style.left = `${x[i][0]}px`;
                    square.style.top = `${x[i][1]}px`;
                    document.querySelector('.board').append(square);
                }
            }
        }
    });
    document.addEventListener('click', (e) => {
        // moving the piece
        if(e.target.id == 'moves'){
            for(i=0;i<x.length;i++){
                if(mouseX-100 <= x[i][0] && mouseX >= x[i][0] && mouseY-100 <= x[i][1] && mouseY >= x[i][1]){
                    if(overlap){
                        for(j=0;j<biggerlist.length;j++){
                            if(biglist[0][j] == Math.floor(mouseX/100)*100 && biglist[1][j] == Math.floor(mouseY/100)*100){
                                if(biggerlist[j].id[1] == 'w'){
                                    cutoff -= 1
                                }
                                document.querySelectorAll(`[id="${biggerlist[j].id}"]`).forEach(p => p.remove());
                            }
                        }
                    }
                    biggerlist[mover].style.left = `${x[i][0]}px`
                    biggerlist[mover].style.top = `${x[i][1]}px`
                    document.querySelectorAll('[id = "moves"]').forEach(p => p.remove());
                    biggerlist = Array.from(document.getElementsByTagName('img'))
                    biglist = [[], []];
                    for(i=0;i<biggerlist.length;i++){
                        biglist[0].push(parseInt(biggerlist[i].style.left,10))
                        biglist[1].push(parseInt(biggerlist[i].style.top,10))
                    }
                    if(turn){turn = false}
                    else{turn = true}
                }
            }
        }
    });
}