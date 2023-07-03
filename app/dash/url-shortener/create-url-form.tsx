'use client'

import React from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'

const FormSchema = z.object({
    url: z.string().min(2, {
        message: 'Url must be at least 2 characters.',
    }),
    customId: z
        .string()
        .min(6, {
            message: 'Custom Id must be at least 6 characters.',
        })
        .max(50),
    direct: z.boolean().default(false).optional(),
})

function CreateUrlForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            url: 'https://nyte.tk',
            direct: true,
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(data)
        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Url</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="a very long url..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="direct"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    // @ts-ignore
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Use direct redirect</FormLabel>
                                <FormDescription>
                                    You can manage your mobile notifications in
                                    the{' '}
                                    <Link href="/examples/forms">
                                        mobile settings
                                    </Link>{' '}
                                    page.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />
                <div className="flex flex-row justify-between items-center space-x-2">
                    <Button className="w-full" type="submit">
                        Submit
                    </Button>
                    <Button
                        onClick={() => {
                            toast({
                                title: 'Reseted',
                            })
                        }}
                        variant={'secondary'}
                        className="w-full"
                    >
                        Reset
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default CreateUrlForm
