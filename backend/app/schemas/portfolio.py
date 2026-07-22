from pydantic import BaseModel, HttpUrl


class PortfolioProjectListItem(BaseModel):
    title: str
    slug: str
    short_description: str
    client_sector: str
    category: str
    technologies: list[str]
    is_placeholder: bool


class PortfolioProjectPublic(PortfolioProjectListItem):
    business_problem: str
    solution: str
    results: list[str]
    images: list[HttpUrl]


class PortfolioProjectCreate(BaseModel):
    title: str
    slug: str
    short_description: str
    client_sector: str
    business_problem: str
    solution: str
    technologies: list[str]
    results: list[str]
    images: list[HttpUrl]
    category: str
    is_placeholder: bool = True


class PortfolioProjectUpdate(BaseModel):
    title: str | None = None
    short_description: str | None = None
    client_sector: str | None = None
    business_problem: str | None = None
    solution: str | None = None
    technologies: list[str] | None = None
    results: list[str] | None = None
    images: list[HttpUrl] | None = None
    category: str | None = None
    is_placeholder: bool | None = None
