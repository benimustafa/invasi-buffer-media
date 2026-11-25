from PIL import Image, ImageDraw, ImageFont, ImageFilter
W,H=1080,1350; BG=(239,235,223); INK=(27,25,22); ACC=(139,38,44); MUTE=(110,104,94)
DM='/usr/share/fonts/truetype/google-fonts/ofl/dmsans/DMSans[opsz,wght].ttf'
def f(sz,w=700):
    ft=ImageFont.truetype(DM,sz)
    try: ft.set_variation_by_axes([14,w])
    except Exception: pass
    return ft
def base():
    im=Image.new('RGB',(W,H),BG); d=ImageDraw.Draw(im)
    d.text((60,52),'INVASI STUDIO',font=f(22,700),fill=INK)
    t='@INVASISTUDIO'; d.text((W-60-d.textlength(t,font=f(22,700)),52),t,font=f(22,700),fill=INK)
    t='CANVA.COM/P/INVASI-STUDIO'; d.text(((W-d.textlength(t,font=f(20,600)))/2,H-70),t,font=f(20,600),fill=MUTE)
    return im,d
def shadow_paste(im,tpl,box):
    x,y,w,h=box; r=tpl.convert('RGB').resize((w,h),Image.LANCZOS)
    sh=Image.new('RGBA',(w+60,h+60),(0,0,0,0)); ImageDraw.Draw(sh).rectangle([30,40,30+w,40+h],fill=(0,0,0,70))
    sh=sh.filter(ImageFilter.GaussianBlur(18)); im.paste(sh,(x-30,y-30),sh); im.paste(r,(x,y))
def fit(tpl,maxw,maxh):
    s=min(maxw/tpl.width,maxh/tpl.height); return int(tpl.width*s),int(tpl.height*s)
T=[('menu.png','01','Menu','New drinks, seasonal specials, price tags.'),
   ('promo.png','02','Promo','Discounts, bundles and buy-one-get-one.'),
   ('hiring.png','03','Hiring','Find your next barista without a designer.'),
   ('opening.png','04','Opening','Coming soon posts for a new place.')]
imgs={k:Image.open('src/'+k) for k,*_ in T}
# cover
im,d=base()
d.text((60,150),'Opening a cafe?',font=f(44,500),fill=ACC)
d.text((60,210),'Coffee shop',font=f(90,800),fill=INK)
d.text((60,310),'templates on Canva.',font=f(90,800),fill=INK)
cw,ch=300,300; pos=[(200,470),(580,470),(200,800),(580,800)]
for i,(k,*_) in enumerate(T):
    w,h=fit(imgs[k],cw,ch); shadow_paste(im,imgs[k],(pos[i][0]+(cw-w)//2,pos[i][1]+(ch-h)//2,w,h))
d.text((60,1140),'Menu · Promo · Hiring · Opening',font=f(34,600),fill=INK)
d.text((60,1190),'Edit in minutes. No designer needed.',font=f(30,400),fill=MUTE)
t='Swipe →'; d.text((W-60-d.textlength(t,font=f(34,700)),1140),t,font=f(34,700),fill=ACC)
im.save('out/01-cover.png')
for n,(k,num,title,line) in enumerate(T,start=2):
    im,d=base()
    d.text((60,140),num,font=f(30,700),fill=ACC)
    d.text((60,180),title,font=f(84,800),fill=INK)
    d.text((60,285),line,font=f(32,400),fill=MUTE)
    w,h=fit(imgs[k],860,860); shadow_paste(im,imgs[k],((W-w)//2,370+(860-h)//2,w,h))
    t='Template preview · Use it on Canva'; d.text(((W-d.textlength(t,font=f(24,600)))/2,1250),t,font=f(24,600),fill=INK)
    im.save(f'out/{n:02d}-{title.lower()}.png')
im,d=base()
d.text((60,300),'Which do you',font=f(96,800),fill=INK)
d.text((60,410),'need first?',font=f(96,800),fill=INK)
for i,(lab,txt) in enumerate([('A','Menu'),('B','Promo post')]):
    y=600+i*150; d.rounded_rectangle([60,y,W-60,y+120],radius=24,outline=INK,width=4)
    d.text((100,y+30),lab,font=f(52,800),fill=ACC); d.text((180,y+30),txt,font=f(52,600),fill=INK)
d.text((60,960),'Find all our coffee templates on Canva:',font=f(34,400),fill=MUTE)
d.text((60,1010),'canva.com/p/invasi-studio',font=f(44,800),fill=INK)
d.text((60,1090),'Custom work? DM us.',font=f(34,600),fill=ACC)
im.save('out/06-cta.png')
