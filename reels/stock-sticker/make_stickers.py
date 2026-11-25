import numpy as np, glob, os
from PIL import Image, ImageFilter
from scipy import ndimage as nd
for f in sorted(glob.glob('raw/*.png')):
    im=Image.open(f).convert('L'); im=im.resize((1200,1200),Image.LANCZOS)
    a=np.array(im); ink=a<128
    # silhouette: close gaps then fill holes
    sil=nd.binary_closing(ink,structure=np.ones((3,3)),iterations=6)
    sil=nd.binary_fill_holes(sil)
    border=nd.binary_dilation(sil,iterations=28)
    H,W=a.shape
    rgba=np.zeros((H,W,4),np.uint8)
    rgba[border]=[255,255,255,255]
    rgba[sil]=[255,255,255,255]
    # ink lines in dark ink with AA from grayscale
    alpha_ink=(255-a).astype(np.float32)/255.0
    for c,v in enumerate([27,25,22]):
        rgba[...,c]=(rgba[...,c]*(1-alpha_ink)+v*alpha_ink).astype(np.uint8)
    rgba[...,3]=np.maximum(rgba[...,3],(alpha_ink*255).astype(np.uint8))
    s=Image.fromarray(rgba,'RGBA')
    bb=s.getbbox(); s=s.crop(bb)
    # shadow
    pad=40; out=Image.new('RGBA',(s.width+2*pad,s.height+2*pad),(0,0,0,0))
    sh=Image.new('RGBA',out.size,(0,0,0,0)); m=s.split()[3]
    sh.paste((0,0,0,90),(pad+6,pad+12),m); sh=sh.filter(ImageFilter.GaussianBlur(14))
    out=Image.alpha_composite(sh,out); out.alpha_composite(s,(pad,pad))
    out.thumbnail((700,700)); out.save('out/'+os.path.basename(f))
    print(f,out.size)
