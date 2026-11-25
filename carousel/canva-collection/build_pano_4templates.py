import importlib.util,sys
spec=importlib.util.spec_from_file_location('b','build.py')
src=open('build.py').read().split('# ---------- COVER')[0]
exec(src)
from PIL import ImageDraw
LAB=F(MR,15)
def caption(d,x,y,num,name):
    spaced(d,(x,y),f'{num} / {name}',LAB,2,INK)
T=[('menu','MENU'),('promo','PROMO'),('hiring','HIRING'),('opening','OPENING')]
# ---- PANORAMA 3240 : 4 template, satu per slot, menyambung antar slide
P=Image.new('RGB',(3240,1350),BG); dP=ImageDraw.Draw(P)
slots=[('menu',80,170,700,875,'01','MENU · NEW DRINKS & SPECIALS'),
       ('promo',840,250,860,860,'02','PROMO · DISCOUNTS & BUNDLES'),
       ('hiring',1770,170,660,825,'03','HIRING · BARISTA WANTED'),
       ('opening',2490,330,700,700,'04','OPENING · COMING SOON')]
for n,x,y,w,h,num,lab in slots:
    place(P,cover_fit(I(n),w,h),x,y,20); dP.rounded_rectangle([x,y,x+w-1,y+h-1],radius=20,outline=SLOT,width=3)
    spaced(dP,(x,y+h+22),f'{num} / {lab}',LAB,2,INK)
for k in range(3):
    s,_=frame(); s.paste(P.crop((k*1080,140,(k+1)*1080,1250)),(0,140)); s.save(f'out3/0{k+2}-pano{k+1}.png')
# ---- CTA : 2x2 empat template
im,d=frame(); hf=F(SER,95)
for i,line in enumerate(['GET THE FULL SET','ON CANVA.']):
    w=d.textlength(line,font=hf); d.text(((1080-w)/2,118+i*93),line,font=hf,fill=INK)
spaced(d,(90,333),'All templates live on our Canva profile.',F(MR,22),1.5,INK,'c',900)
d.rounded_rectangle([290,400,790,435],radius=18,fill=INK)
spaced(d,(290,407),'OPEN OUR CANVA PROFILE  →',F(MM,16),1,BG,'c',500)
cw,ch=446,370
for i,(n,_) in enumerate(T):
    cx=82+(i%2)*(cw+27); cy=465+(i//2)*(ch+16)
    src=I(n); sc=min(cw/src.width,ch/src.height); w,h=round(src.width*sc),round(src.height*sc)
    x=cx+(cw-w)//2; y=cy+(ch-h)//2
    place(im,src.resize((w,h)),x,y,14); d.rounded_rectangle([x,y,x+w-1,y+h-1],radius=14,outline=SLOT,width=3)
im.save('out3/05-cta.png')
