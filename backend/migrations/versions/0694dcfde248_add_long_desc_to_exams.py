"""add long desc to exams

Revision ID: 0694dcfde248
Revises: 
Create Date: 2021-11-08 16:38:44.155231

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "0694dcfde248"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        "exams",
        sa.Column(
            "long_description",
            sa.Text,
            nullable=False,
            server_default="Default exam description",
        ),
    )


def downgrade():
    pass
