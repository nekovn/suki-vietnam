
from django.db import models
from django.utils.html import mark_safe
import sys
sys.path.append('../')
from categorybox.models import Category

def upload_location(instance, filename):
    return "logo/%s" %(filename)


class LogoBox(models.Model):
    title = models.CharField(verbose_name='タイトル', max_length=200)
    url = models.CharField(verbose_name='リンク', max_length=200)
    image = models.ImageField(verbose_name='画像', upload_to=upload_location, null=True, blank=True )
    category = models.ForeignKey(Category, on_delete=models.CASCADE,verbose_name='カテゴリー')
    place = models.IntegerField(verbose_name='位置')
    is_active = models.IntegerField(verbose_name='状態',
                                    default=1,
                                    blank=True,
                                    null=True,
                                    help_text='Active->効化, Inactive->無効化',
                                    choices=(
                                    (1, 'Active'), (0, 'Inactive')
                                    ))
    created = models.DateTimeField(verbose_name='作成日', auto_now=False, auto_now_add=True)
    modified = models.DateTimeField(verbose_name='更新日', auto_now=True, auto_now_add=False)

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'logo_box'
        verbose_name_plural = 'ロゴボックス'


    @property
    def thumbnail_preview(self):
        if self.image:
            return mark_safe('<img src="/media/{}" width="40" height="40" />'.format(self.image))
        return ""

