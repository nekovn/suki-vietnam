# Generated by Django 2.2.1 on 2021-07-01 10:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='created',
            field=models.DateTimeField(auto_now_add=True, verbose_name='送信日'),
        ),
        migrations.AlterField(
            model_name='contact',
            name='modified',
            field=models.DateTimeField(auto_now=True, verbose_name='返事日'),
        ),
    ]
