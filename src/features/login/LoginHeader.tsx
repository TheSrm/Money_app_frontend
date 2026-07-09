import { LanguageSwitcher } from "../../components/LanguageSwitcher";

export default function Header() {
    const menuItems = [
        { label: "Inicio", href: "#" },
        { label: "Proyectos", href: "#" },
        { label: "Perfil", href: "#" }
    ];

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center gap-16">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                            Mi App
                        </div>
                    </div>

                    {/* Menú */}
                    <nav className="flex items-center gap-16">
                        {menuItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-gray-600 font-medium hover:text-blue-600 transition-colors duration-200 relative group whitespace-nowrap"
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                    </nav>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Usuario y Switcher */}
                    <div className="flex items-center gap-8 flex-shrink-0">
                        <LanguageSwitcher />

                        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                                JD
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                                Juan
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
}