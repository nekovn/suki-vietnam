from django.contrib import admin
from users.models import NewUser, Contact
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django.contrib.admin.actions import delete_selected
from django import forms
from django.db import models

class ContactModelAdmin(admin.ModelAdmin):
    list_display = ["name", "email","message","code","active","created", "modified"]
    list_display_links = ["modified", "name","email","active"]
    list_filter = ["created","modified"]
    search_fields = ["email","name"]

    delete_selected.short_description = '選択した項目の削除'
    def active(self, obj):
        return obj.is_active == 1
    active.short_description = '状態'
    active.boolean = True

    def make_active(modeladmin, request, queryset):
        queryset.update(is_active=1)
        messages.success(request, "選択した項目が効化されました！")

    def make_inactive(modeladmin, request, queryset):
        queryset.update(is_active=0)
        messages.success(request, "選択した項目が無効化されました！")

    admin.site.add_action(make_active, "選択した項目の効化")
    admin.site.add_action(make_inactive, "選択した項目の無効化")

    class Meta:
        model = Contact

admin.site.register(Contact, ContactModelAdmin)





class UserAdminConfig(UserAdmin):
    model = NewUser
    search_fields = ('email', 'user_name', 'first_name',)
    list_filter = ('email', 'user_name', 'first_name', 'is_active', 'is_staff')
    ordering = ('created','modified')
    list_display = ('user_name','email' , 'first_name','gender','birthday','thumbnail_preview',
                    'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'user_name', 'first_name','gender','image','birthday')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),

    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name', 'first_name','gender','birthday' 'password1', 'password2','image','is_active', 'is_staff')}
         ),
    )

    def thumbnail_preview(self, obj):
        return obj.thumbnail_preview
    thumbnail_preview.short_description = '画像'
    thumbnail_preview.allow_tags = True

admin.site.register(NewUser, UserAdminConfig)