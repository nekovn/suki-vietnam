
from django.contrib import admin
from django.contrib import messages
from django.contrib.admin.actions import delete_selected
from .models import LogoBox
# Register your models here.


class LogoBoxModelAdmin(admin.ModelAdmin):
    list_display = ["title", "url", "thumbnail_preview", "active", "place", "created", "modified"]
    list_display_links = ["modified", "thumbnail_preview", "place", 'active', 'url']
    list_editable = ["title"]
    list_filter = ["created","modified"]
    search_fields = ["title","url"]

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

    def thumbnail_preview(self, obj):
        return obj.thumbnail_preview
    thumbnail_preview.short_description = '画像'
    thumbnail_preview.allow_tags = True

    class Meta:
        model = LogoBox


admin.site.register(LogoBox, LogoBoxModelAdmin)