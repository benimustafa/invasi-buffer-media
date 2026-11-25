from PIL import Image, ImageDraw, ImageFont
BG=(239,235,223); INK=(43,42,20); SLOT=(216,211,196)
SER='fonts/InstrumentSerif-Regular.ttf'; MR='fonts/IBMPlexMono-Regular.ttf'; MM='fonts/IBMPlexMono-Medium.ttf'
def F(p,s): return ImageFont.truetype(p,s)
def spaced(d,xy,text,font,ls,fill,anchor='l',width=None):
    # draw text with letter spacing; anchor l/c/r relative to box (x,width)
    w=sum(d.textlength(c,font=font) for c in text)+ls*(len(text)-1)
    x,y=xy
    if anchor=='c': x=x+(width-w)/2
    if anchor=='r': x=x+width-w
    for c in text:
        d.text((x,y),c,font=font,fill=fill); x+=d.textlength(c,font=font)+ls
def frame():
    im=Image.new('RGB',(1080,1350),BG); d=ImageDraw.Draw(im); f=F(MR,13)
    spaced(d,(71,50),'INVASI STUDIO',f,1.2,INK); spaced(d,(829,50),'@INVASISTUDIO',f,1.2,INK,'r',180)
    spaced(d,(71,1285),'INVASI STUDIO',f,1.2,INK); spaced(d,(829,1285),'@INVASISTUDIO',f,1.2,INK,'r',180)
    spaced(d,(290,1283),'www.canva.com/p/invasi-studio/',F(MM,14),0.5,INK,'c',500)
    return im,d
def cover_fit(img,w,h):
    s=max(w/img.width,h/img.height); r=img.resize((round(img.width*s),round(img.height*s)),Image.LANCZOS)
    l=(r.width-w)//2; t=(r.height-h)//2; return r.crop((l,t,l+w,t+h))
def collage(imgs,w,h,gap=16,pad=18):
    c=Image.new('RGB',(w,h),SLOT); n=len(imgs); ih=h-2*pad; iw=(w-2*pad-gap*(n-1))//n; s=min(ih,iw)
    tot=n*s+gap*(n-1); x=(w-tot)//2
    for im in imgs:
        c.paste(cover_fit(im,s,s),(x,(h-s)//2)); x+=s+gap
    return c
def place(canvas,tile,x,y,radius,stroke=0):
    w,h=tile.size
    if stroke:
        t=Image.new('RGB',(w,h),(255,255,255)); t.paste(tile.resize((w-2*stroke,h-2*stroke),Image.LANCZOS),(stroke,stroke)); tile=t
    m=Image.new('L',(w,h),0); ImageDraw.Draw(m).rounded_rectangle([0,0,w-1,h-1],radius=radius,fill=255)
    canvas.paste(tile,(x,y),m)
I=lambda n: Image.open(f'src/{n}.png').convert('RGB')
# ---------- COVER (static fallback; slide 1 final = Remotion) ----------
im,d=frame()
hf=F(SER,118)
for i,line in enumerate(['CAFE TEMPLATES,','READY TO EDIT.']):
    w=d.textlength(line,font=hf); d.text(((1080-w)/2,121+i*102),line,font=hf,fill=INK)
for i,(n,ox,oy) in enumerate([('menu',0,0),('promo',250,90),('hiring',500,180)]):
    place(im,cover_fit(I(n),420,525),82+ox,380+oy,6,stroke=8)
spaced(d,(140,1148),'MENUS, PROMOS, HIRING POSTS + MORE',F(MR,24),3,INK,'c',800)
d.rounded_rectangle([403,1212,677,1247],radius=18,fill=INK)
spaced(d,(403,1219),'SWIPE TO SEE THE SET  →',F(MM,16),1,BG,'c',274)
im.save('out/01-cover.png')
# ---------- PANORAMA 3240x1350 ----------
P=Image.new('RGB',(3240,1350),BG)
slots=[('img1',80,170,700,875,cover_fit(I('menu'),700,875)),
 ('img2',830,170,900,506,collage([I('newproduct'),I('brewing')],900,506)),
 ('img3',830,716,420,420,cover_fit(I('promo'),420,420)),
 ('img4',1290,716,440,420,cover_fit(I('opening'),440,420)),
 ('img5',1780,170,600,750,cover_fit(I('hiring'),600,750)),
 ('img6',1780,960,600,270,collage([I('newstore'),I('shipping')],600,270,gap=14,pad=14)),
 ('img7',2420,170,420,747,cover_fit(I('wallpaper'),420,747)),
 ('img8',2420,957,820,273,collage([I('stylish'),I('cafepromo'),I('monday')],820,273,gap=14,pad=14)),
 ('img9',2880,170,360,747,cover_fit(I('reels'),360,747))]
for _,x,y,w,h,t in slots: place(P,t,x,y,20)
for k in range(3):
    s,dd=frame(); crop=P.crop((k*1080,140,(k+1)*1080,1250)); s.paste(crop,(0,140))
    s.save(f'out/0{k+2}-pano{k+1}.png')
# ---------- CTA ----------
im,d=frame(); hf=F(SER,95)
for i,line in enumerate(['GET THE FULL SET','ON CANVA.']):
    w=d.textlength(line,font=hf); d.text(((1080-w)/2,118+i*93),line,font=hf,fill=INK)
spaced(d,(90,333),'All templates live on our Canva profile.',F(MR,22),1.5,INK,'c',900)
d.rounded_rectangle([290,400,790,435],radius=18,fill=INK)
spaced(d,(290,407),'OPEN OUR CANVA PROFILE  →',F(MM,16),1,BG,'c',500)
place(im,collage([I('logo1'),I('logo2'),I('logo3')],919,580,gap=20,pad=40),82,459,20)
for i,n in enumerate(['menu','promo','hiring','opening']):
    place(im,cover_fit(I(n),221,179),82+round(i*232.75),459+592,14)
im.save('out/05-cta.png')
fs=['01-cover','02-pano1','03-pano2','04-pano3','05-cta']
sh=Image.new('RGB',(5*432,540),'white')
for i,f in enumerate(fs): sh.paste(Image.open(f'out/{f}.png').resize((432,540)),(i*432,0))
sh.save('sheet.jpg')
