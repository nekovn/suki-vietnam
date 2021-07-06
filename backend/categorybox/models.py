from django.db import models
from django.utils.html import mark_safe

def upload_location_category(instance, filename):
    return "category/%s" %(filename)
def upload_location(instance, filename):
    return "category_item/%s" %(filename)

# Create your models here.
class Category(models.Model):
    title = models.CharField(verbose_name='タイトル', max_length=200)
    place = models.IntegerField(verbose_name='位置')
    image = models.ImageField(verbose_name='画像', upload_to= upload_location_category,null= True, blank= True )
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
        db_table = 'category'
        verbose_name_plural = 'カテゴリー名'

    @property
    def thumbnail_preview(self):
        if self.image:
            return mark_safe('<img src="{}" width="40" height="40" />'.format(self.image.url))
        return ""


class CategoryItem(models.Model):
    title = models.CharField(verbose_name='タイトル', max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,verbose_name='カテゴリー')
    url = models.CharField(verbose_name='リンク', max_length=200)
    place = models.IntegerField(verbose_name='位置')
    image = models.ImageField(verbose_name='画像', upload_to= upload_location,null= True, blank= True )
    is_active = models.IntegerField(verbose_name='状態',
                                    default = 1,
                                    blank = True,
                                    null = True,
                                    help_text ='Active->効化, Inactive->無効化',
                                    choices =(
                                    (1, 'Active'), (0, 'Inactive')
                                    ))
    created  = models.DateTimeField(verbose_name='作成日', auto_now=False, auto_now_add=True)
    modified = models.DateTimeField(verbose_name='更新日', auto_now=True, auto_now_add=False)

    def __unicode__(self):
        return self.title
    def __str__(self):
        return self.title

    class Meta:
        db_table = 'category_item'
        verbose_name_plural = 'カテゴリー項目'


    @property
    def thumbnail_preview(self):
        if self.image:
            return mark_safe('<img src="{}" width="40" height="40" />'.format(self.image.url))
        return ""