from django.db import models

class College_Admin(models.Model):
  class Meta:
    verbose_name_plural = "College_Admins"
  username = models.CharField(max_length=100, unique=True)
  college_name = models.CharField(max_length=100)
  password = models.CharField(max_length=100)

  def __str__(self):
    return self.college_name